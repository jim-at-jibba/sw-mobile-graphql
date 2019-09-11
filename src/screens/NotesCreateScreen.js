import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Surface, TextInput, Button } from 'react-native-paper';
import { Formik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { gStyle } from '../constants';
import { GET_NOTES } from './NotesScreen';
import { AlertContext } from '../globalState';

const ADD_NOTE = gql`
  mutation($title: String!, $note: String!) {
    createNotes(data: { title: $title, note: $note, status: PUBLISHED }) {
      id
    }
  }
`;
const NoteCreateScreen = ({ navigation }) => {
  const [addNote, { data, error }] = useMutation(ADD_NOTE);

  React.useEffect(() => {
    if (data) {
      console.log('DATA', data);
      setAlertType('success');
      setAlertMessage('Create note success');
      setAlertOpen(true);
      navigation.goBack();
    } else if (error) {
      console.log('ERR', error);
    }
  });
  const { setAlertType, setAlertOpen, setAlertMessage } = React.useContext(
    AlertContext
  );
  return (
    <SafeAreaView style={gStyle.container}>
      <ScrollView contentContainerStyle={gStyle.contentContainer}>
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
          <Surface style={styles.surface}>
            <Formik
              initialValues={{ note: '', title: '' }}
              onSubmit={({ note, title }) => {
                addNote({
                  variables: { title, note },
                  refetchQueries: () => [{ query: GET_NOTES }]
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
