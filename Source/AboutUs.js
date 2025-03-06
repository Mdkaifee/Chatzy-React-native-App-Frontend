import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

const AboutUs = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>About Chatzy</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.boldText}>Chatzy</Text> is an innovative platform
          designed to streamline the management of your salon business. Our goal
          is to provide salon owners with the tools they need to efficiently
          manage staff schedules, appointments, and customer interactions, all
          in one place.
        </Text>
        <Text style={styles.paragraph}>
          With <Text style={styles.boldText}>Chatzy</Text>, you can easily
          onboard your salon staff, assign shifts, and ensure seamless operation
          throughout the day. Whether you're managing a single location or
          multiple salons, our app helps you stay organized, reduce no-shows,
          and provide a better experience for both your staff and customers.
        </Text>
        <Text style={styles.paragraph}>
          Our mission is to empower salon owners to focus on what truly matters:
          delivering exceptional services to your clients while we handle the
          operational tasks. We're here to make your business run smoothly,
          allowing you to grow and thrive in a competitive industry.
        </Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Text style={styles.footerText}>Terms of Service</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    padding: 20,
    paddingBottom: 80, // To give space for footer
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerItem: {
    padding: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#007bff',
  },
});

export default AboutUs;
