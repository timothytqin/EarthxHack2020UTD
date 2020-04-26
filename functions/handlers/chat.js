const { db } = require("../util/admin");

exports.createChatRoom = (req, res) => {
  const newChatRoom = {
    members: [
      { username: req.user.username, imageUrl: req.user.imageUrl },
      { username: req.body.username, imageUrl: req.body.imageUrl }
    ]
  };
  db.collection("chatrooms")
    .get()
    .then(data => {
      if (data.size > 0) {
        const chatRoom = newChatRoom;
        data.forEach(doc => {
          if (
            (doc.data().members[0].username ==
              newChatRoom.members[0].username &&
              doc.data().members[1].username ==
                newChatRoom.members[1].username) ||
            (doc.data().members[0].username ==
              newChatRoom.members[1].username &&
              doc.data().members[1].username ==
                newChatRoom.members[0].username) ||
            (doc.data().members[1].username ==
              newChatRoom.members[0].username &&
              doc.data().members[0].username == newChatRoom.members[1].username)
          ) {
            chatRoom.chatId = doc.id;
          }
        });
        res.json(chatRoom);
      } else
        return db
          .collection("chatrooms")
          .add(newChatRoom)
          .then(doc => {
            const chatRoom = newChatRoom;
            chatRoom.chatId = doc.id;
            return res.status(201).json(chatRoom);
          });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.getChatMessages = (req, res) => {
  db.doc(`/chatrooms/${req.params.chatId}`)
    .get()
    .then(doc => {
      if (!doc.exists) return res.status(404).json({ error: "Chat not found" });
      if (!doc.data().members.includes(req.user.username))
        return res.status(401).json({ error: "Unauthorized" });
      return db
        .collection("messages")
        .where("chatId", "==", req.params.chatId)
        .orderBy("createdAt", "desc")
        .get();
    })
    .then(data => {
      let chatMessages = [];
      data.forEach(doc => {
        chatMessages.push(doc.data());
      });
      return res.json(chatMessages);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.createChatMessage = (req, res) => {
  const newChatMessage = {
    chatId: req.params.chatId,
    sender: req.user.username,
    senderImage: req.user.imageUrl,
    message: req.body.message,
    createdAt: new Date().toISOString(),
    read: false
  };
  db.collection("messages")
    .add(newChatMessage)
    .then(doc => {
      const chatMessage = newChatMessage;
      chatMessage.messageId = doc.id;
      return res.status(201).json(chatMessage);
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.deleteChatMessage = (req, res) => {
  const document = db.doc(`/messages/${req.params.messageId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists)
        return res.status(404).json({ error: "Message not found" });
      if (doc.data().sender !== req.user.username)
        return res.status(403).json({ error: "Unauthorized" });
      return document.delete();
    })
    .then(() => {
      res.json({ message: "Message deleted successfully" });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
