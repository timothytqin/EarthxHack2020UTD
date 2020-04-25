import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { ListItem } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";

import { globalStyles, images } from "../../styles/global";

export default function FAQ({ navigation }) {
  navigation.setOptions({
    headerLeft: () => (
      <TouchableOpacity
        style={globalStyles.menu}
        onPress={() => navigation.toggleDrawer()}
      >
        <MaterialIcons name="menu" size={32} />
      </TouchableOpacity>
    )
  });

  const faqs = {
    GettingStarted: [
      {
        question: "What is National Honor Society, and why should I care?",
        answer:
          "Membership in NHS is one of the highest honors that can be awarded to a high school student. Chapters in more than 15,000 high schools across the nation strive to give practical meaning to the Society's goals of scholarship, leadership, service, and character. NHS is one of the very few high school organizations that is universally recognized by college admissions officers and scholarship committees as being challenging and elite.Many of these awards and admissions are given to NHS members over non- NHS members with all other qualifications being equal. Volunteering and community involvement also fosters personal satisfaction and contentment as well as good citizenship through a lifelong commitment to volunteerism."
      },
      {
        question: "What are NHS’s core values?",
        answer:
          "We strongly believe in our “Four Pillars of NHS”:\n\t1) Character - NHS seeks to develop students with responsible citizenship demonstrated in all their actions.\n\t2) Scholarship - We want to create an enthusiasm for knowledge, characterized by a commitment to learning.\n\t3) Leadership - Promoting direction by taking the initiative to aid others in our daily activities is core to our philosophy.\n\t4) Service - Members should stimulate a personal desire to render service for the benefit of those in need. "
      },
      {
        question:
          "Who do I ask if I have questions throughout the year about NHS?",
        answer:
          "Please ask any of your NHS officers— we are happy to help and extremely knowledgeable. Alternatively, you may talk to the Plano West NHS Sponsor, Mrs. Robinson in A2013 between classes or during lunch. DO NOT INTERRUPT HER CLASSES!!"
      },
      {
        question: "Are there dues to join NHS?",
        answer:
          "Yes. Dues for the 2019-2020 school year are $2 and are due by September 19th."
      },
      {
        question:
          "When will NHS Officer applications be released? Who can apply?",
        answer:
          "Applications for rising seniors (current juniors) are available at tinyurl.com/pwnhsapp.  Applications (which includes 15 service hours) will be due April 15, 2020. The initial applicant pool will be cut roughly in half and the second phase will receive a in-person interview. Results will be announced (TBD). "
      },
      {
        question:
          "I just moved to Plano West but I was in NHS at my old school?",
        answer:
          "Ask your old NHS sponsor to email our sponsor some verification that you were a member in good standing at your old school and you'll be a member of NHS at Plano West. Welcome to the Wolfpack!!"
      }
    ],
    Membership: [
      {
        question:
          "What are the requirements to be Inducted into NHS— or to maintain Membership in NHS?",
        answer:
          '* Maintaining a minimum cumulative GPA of 3.60\n* All students are expected to attend all 2 meetings a semester\n* Earning at least 15 hours of verified, signed community service each semester\n* Modeling respectful character(no cheating, no referrals, no suspensions, etc.)\n* Approval by a five-member Faculty Council(for Applying Members ONLY)\n\nIf the student is a Current Member(inducted at Shepton or Jasper) and all the above requirements—excluding approval by the five- member Faculty Council—are met, he or she retains existing Chapter Membership.If one or more requirements for the semester are not fulfilled, a Member will receive penalty hours.Further actions may be taken per case, as reviewed by the five - member Faculty Council.\n\nIf the student is a Applying Member and all the above requirements are met, he or she will be Inducted into the National Honor Society at the Induction Ceremony in April.At that time, the student will possess official Membership in the Chapter.If the student is eligible to continue NHS the following year, he or she will then be a "Current Member." If one or more of the requirements for the semester are not fulfilled, a Applying Member will receive written notice of his or her ineligibility to be Inducted into NHS for that year.'
      },
      {
        question: "What does it mean if I receive Penalty Hours?",
        answer:
          'Think of penalty hours as a warning issued to Current Members to notify them if they are not meeting the requirements to maintain Membership in good standing. Penalty hours are given so that you can "make up" what you failed to do the previous semester. Penalty hours derived from failing to meet requirements from the Fall 2019 semester will be delivered in January 2020.\n\nPenalty hours may be issued because a Current Member fails to earn enough hours, attend enough meetings, pay dues on time, or submit completed paperwork on time.\n\nYou are not "kicked out" of NHS if you get penalty hours, so work hard to get those penalty hours done.\n\nTreat Penalty Hours SERIOUSLY.Once they start to pile up, it\'s hard to recover and bounce back!'
      },
      {
        question:
          "How many Penalty Hours do I get for missing.../not doing...?",
        answer:
          "Late dues will lead to 5 penalty hours.\n\nLate hours will lead to 5 penalty hours.\n\nYou are only obligated to attend two meetings-- failure to attend two will give you 2 penalty hours per meeting missed."
      },
      {
        question: "Are Applying Members eligible for Penalty Hours?",
        answer:
          'No. Because "Applying Members" are not official Members yet, they do not enjoy certain privileges that Current Members do, such as the right to receive penalty hours to make up what they didn\'t do.Thus, if one or more of the requirements for the semester are not fulfilled, an Applying Member will not receive penalty hours, but rather receive written notice of his or her ineligibility to be Inducted into NHS for that year.'
      },
      {
        question: "Where do I log my Penalty Hours?",
        answer:
          "Log them on a regular hour sheet with your hours for the semester. Any hours you do above the 15 hour (7 hour seniors second semester) requirement, we will deduct from your penalty hours."
      },
      {
        question: "I'm a Senior. Can I apply to be in NHS?",
        answer: "No. This is stated in our bylaws."
      }
    ],
    Meetings: [
      {
        question: "When and where are NHS meetings?",
        answer:
          "Meetings are held during both lunches in the Presentation room.\n\n2020 Spring Meeting Dates:\nJanuary 23: Senior Informational Meeting\nJanuary 24: Junior Informational Meeting\nJanuary 29: Makeup Informational Meeting\nFebruary 11: Senior Service Meeting\nFebruary 13: Junior Service Meeting\nFebruary 21: Makeup Service Meeting"
      },
      {
        question: "How many meetings do I have to go to?",
        answer: "Two. 2. dos. (3-1)"
      },
      {
        question: "How many penalty hours if I miss a meeting?",
        answer: "It's two penalty hours per missed meeting."
      },
      {
        question: "Do I earn two service hours if I go to a meeting?",
        answer: "No."
      },
      {
        question: "Do I have to stay for the entire NHS meeting?",
        answer:
          "Yes! We will only award meeting credit if you arrive on time and stay for the ENTIRE meeting."
      },
      {
        question: "How do you keep track of what meetings I've been to?",
        answer: "Check out the Status tab!"
      },
      {
        question: "What is discussed at NHS meetings?",
        answer:
          "The first meeting in September is an information session to guide students along on their path to NHS membership. Throughout the year, NHS meetings serve as ways to convey important updates about membership and community service opportunities, including chapter service projects. We also invite guest speakers to share volunteer opportunities in the community."
      }
    ],
    Service: [
      {
        question:
          "I need service hours! Where can I find opportunities to volunteer?",
        answer:
          "We've prepared our list of carefully-curated, constantly-updated long term opportunities for your community service hours here. Please keep in mind you are not limited to these events. We also regularly post short term event volunteer opportunities on our Upcoming Volunteer Opportunities tab! Last-minute opportunities may also be sent out through Remind. "
      },
      {
        question: "How many service hours do I need per semester?",
        answer:
          "In order to be Inducted into NHS, or to remain in good standing in NHS, each student must earn at least 15 hours each semester. Second semester seniors only need 7 hours. "
      },
      {
        question: "When and where are Hour sheets due?",
        answer:
          "Fall 2019 Hours Due: Thursday, December 5, 2019, by NOON\n\nHour sheets are due to Mrs.Robinson's room A2013\n\nThis deadline is a hard deadline.No ifs, ands, or buts."
      },
      {
        question: "How do I get my Organization/Event approved?",
        answer:
          "In order to be Inducted into NHS, or to remain in good standing in NHS, each student must earn at least 15 hours each semester. Second semester seniors only need 7 hours."
      },
      {
        question: "What does NOT count as service credits?",
        answer:
          "This is not an all-inclusive list.  You MUST have your event approved by filling out the form\n* Events spreading a religious or political message\n* Activities that are required for another class/organization (it must be voluntary!)\n* Chores or extra work at the home of an individual(i.e.babysitting your neighbor’s child or mowing your parents’ lawn)\n* Times when you are not actively serving(travel time or time spent overnight does not count)"
      },
      {
        question: "Do summer volunteer hours count towards NHS?",
        answer:
          "Yes, both current Members and applying members may log up to 10 summer hours to their FALL 2019 hours. "
      },
      {
        question:
          "If I do more than 15 hours in one semester, can they roll over to the next?",
        answer:
          "No. You must consistently contribute to your community throughout the entire school year. All NHS Members and potential Inductees must contribute at least 15 hours of community service each semester."
      },
      {
        question: "Do donations count as hours?",
        answer: "No."
      },
      {
        question:
          "Why does my volunteer supervisor have to provide his or her name, signature, and phone number?",
        answer:
          "Prior to determining a student’s induction status, the NHS officers may need to verify the authenticity of the hours and the upholding of the “character” pillar."
      },
      {
        question:
          "What restrictions are there to earning hours in specific areas?",
        answer:
          "*10 hours max from the summer\n* 10 hours max per organization\n* 8 hours max of volunteering in one day\n\nBreaking these rules will cause the hours in question to not be counted."
      },
      {
        question: "Can I scratch things out on my hour sheet?",
        answer:
          "Please do not scratch out anything on your hours sheet. If you do so, you may be penalized as we have no way of knowing if you changed the number of hours or other important information after you received a signature for your service."
      },
      {
        question: "What if I lose my hours sheet?",
        answer:
          "If you lose your hour sheet, you can get a new one in Mrs. Robinson’s room or print one off here. Do not turn in a notebook paper with your hours on it; we will not accept it! That is what the hours sheets are for. "
      },
      {
        question:
          "Can I Double Dip my hours between NHS and another organization?",
        answer:
          "Getting hours for two separate clubs (for example, Key Club and NHS) at a single event is STRICTLY PROHIBITED!\n\nWe DO check and you will not receive credit for your service.\n\nIf a club does not have hours requirements, those events may count for NHS hours UNLESS YOU ARE AN OFFICER IN THAT CLUB."
      },
      {
        question:
          "I have a service opportunity I'd like advertised, or need volunteers for. Can you help me?",
        answer: "Of course!! Shoot us a quick email at pwestnhs@gmail.com"
      }
    ]
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.headerText}>Frequently Asked Questions</Text>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Details", {
              headerTitle: "Getting Started",
              data: faqs.GettingStarted
            })
          }
        >
          {/* <ImageBackground
            source={images.nhs}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            imageStyle={styles.bg}
          > */}
            <Text style={styles.faqText}>Getting Started</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Details", {
              headerTitle: "Membership",
              data: faqs.Membership
            })
          }
        >
          <ImageBackground
            source={images.nhs}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            imageStyle={styles.bg}
          >
            <Text style={styles.faqText}>Membership</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomRow}>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Details", {
              headerTitle: "Meetings",
              data: faqs.Meetings
            })
          }
        >
          <ImageBackground
            source={images.nhs}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            imageStyle={styles.bg}
          >
            <Text style={styles.faqText}>Meetings</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("Details", {
              headerTitle: "Service",
              data: faqs.Service
            })
          }
        >
          <ImageBackground
            source={images.nhs}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            imageStyle={styles.bg}
          >
            <Text style={styles.faqText}>Service</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#00f",
    textAlign: "center",
    padding: 10
  },
  topRow: {
    flex: 1,
    flexDirection: "row"
  },
  bottomRow: {
    flex: 1,
    flexDirection: "row"
  },
  card: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 15,
    margin: 5
  },
  faqText: {
    fontWeight: "bold",
    fontSize: 24
  },
  bg: {
    resizeMode: "contain",
    borderRadius: 5,
    opacity: 0.4
  }
});
