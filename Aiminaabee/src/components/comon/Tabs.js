import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Tabs extends Component {
  // Initialize State
  state = {
    // First tab is active by default
    activeTab: 0,
  };

  // Pull children out of props passed from App component
  render({ children } = this.props) {
    return (
      <View style={styles.container}>
        {/* Tabs row */}
        <View style={styles.tabsContainer}>
          {/* Pull props out of children, and pull title out of props */}
          {children.map(({ props: { title } }, index) => (
            <TouchableOpacity
              style={[
                // Default style for every tab
                styles.tabContainer,
                // Merge default style with styles.tabContainerActive for active tab
                index === this.state.activeTab ? styles.tabContainerActive : [],
              ]}
              // Change active tab
              onPress={() => this.setState({ activeTab: index })}
              // Required key prop for components generated returned by map iterator
              key={index}>
              <Text style={styles.tabText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Content */}
        <View style={styles.contentContainer}>{children[this.state.activeTab]}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Component container
  container: {
    flex: 1, // Take up all available space
  },
  // Tabs row container
  tabsContainer: {
    flexDirection: 'row', // Arrange tabs in a row
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#f2f2f2',
  },
  // Individual tab container
  tabContainer: {
    flex: 1, // Take up equal amount of space for each tab
    paddingVertical: 15, // Vertical padding
  },
  // Active tab container
  tabContainerActive: {
    borderBottomWidth: 1, // Add thick border at the bottom
    borderBottomColor: '#2C2F33', // Transparent border for inactive tabs
  },
  // Tab text
  tabText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Content container
  contentContainer: {
    flex: 1, // Take up all available space
  },
});
