import React from 'react';
import PropTypes from 'prop-types';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Surface, TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { gStyle } from '../constants';
import { AlertContext } from '../globalState';
import { createNotes } from '../graphql/mutations';

const NoteCreateScreen = ({ navigation }) => {
  const { setAlertType, setAlertOpen, setAlertMessage } = React.useContext(
    AlertContext
  );

  const createNote = useMutation(gql(createNotes));
  return (
    <SafeAreaView style={gStyle.container}>
      <ScrollView contentContainerStyle={gStyle.contentContainer}>
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
          <Surface style={styles.surface}>
            <Formik
              initialValues={{ note: '', title: '' }}
              onSubmit={({ note, title }) => {
                const input = {
                  id: uuid(),
                  title,
                  note,
                  createdAt: moment().toISOString()
                };
                createNote({
                  variables: {
                    input
                  },
                  update: (_, { data, error }) => {
                    if (error) {
                      console.log('Error', error);
                    } else {
                      console.log('DATA', data);
                      navigation.state.params.refetch();
                      navigation.goBack();
                    }
                  }
                });
              }}
            >
              {({ values, handleSubmit, handleChange }) => {
                return (
                  <>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        mode="outlined"
                        label="Title"
                        onChangeText={handleChange('title')}
                        value={values.title}
                      />
                    </View>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        mode="outlined"
                        label="Note"
                        multiline
                        numberOfLines={5}
                        onChangeText={handleChange('note')}
                        value={values.note}
                      />
                    </View>
                    <View style={styles.inputWrapper}>
                      <Button mode="contained" onPress={handleSubmit}>
                        Submit
                      </Button>
                    </View>
                  </>
                );
              }}
            </Formik>
          </Surface>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

NoteCreateScreen.navigationOptions = {
  title: 'Note'
};

NoteCreateScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 10
  },
  surface: {
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 4
  }
});

export default NoteCreateScreen;
