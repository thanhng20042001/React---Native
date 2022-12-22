import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppWrapper } from '@calendar/components';
import { CalendarNavigation } from '@calendar/navigation';
import * as Calendar from 'expo-calendar';

class App extends Component {
  async componentDidMount() {
    //hỏi quyền truy cập vào ứng dụng lịch trên moblie
    await this._askForCalendarPermissions();
    await this._askForReminderPermissions();

    StatusBar.pushStackEntry({
      animated: true,
      barStyle: 'dark-content'
    });
  }

  _askForCalendarPermissions = async () => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getCalendarsAsync(
        Calendar.EntityTypes.EVENT
      );
    }
  };

  _askForReminderPermissions = async () => {
    if (Platform.OS === 'android') {
      return true;
    }

    const { status } = await Calendar.requestRemindersPermissionsAsync();
    if (status === 'granted') {
      const calendars = await Calendar.getRemindersPermissionsAsync(
        Calendar.EntityTypes.REMINDER
      );
    }
  };

  render = () => (
    <SafeAreaProvider style={{ backgroundColor: '#FFFFFF' }}>
      <AppWrapper>
        <CalendarNavigation />
      </AppWrapper>
    </SafeAreaProvider>
  );
}

export default App;
