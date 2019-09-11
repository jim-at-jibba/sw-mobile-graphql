import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Text, Surface, FAB, List } from 'react-native-paper';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { gStyle } from '../constants';

export const GET_NOTES = gql`
  query {
    noteses {
      id
      title
    }
  }
`;

const NotesScreen = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_NOTES);
  const [notes, setNotes] = React.useState([]);

  React.useEffect(() => {
    if (data && data.noteses) {
      setNotes(data.noteses);
    } else if (error) {
      console.log('Error', error);
      // Add error handling here
    }
  }, [data, error]);

  return (
    <SafeAreaView style={gStyle.container}>
      <ScrollView contentContainerStyle={gStyle.contentContainer}>
        {loading ? (
          <View>
            <Text>Loading</Text>
          </View>
        ) : (
          <View style={{ flex: 1, height: '100%', width: '100%' }}>
            {notes.length > 0 ? (
              notes.map(note => {
                return (
                  <Surface key={note.id} style={styles.surface}>
                    <List.Item
                      title={note.title}
                      description={note.content}
                      onPress={() =>
                        navigation.navigate('Note', { id: note.id })
                      }
                      left={props => <List.Icon {...props} icon="create" />}
                    />
                  </Surface>
                );
              })
            ) : (
              <View>
                <Text>No notes</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="add"
        onPress={() => navigation.navigate('NoteCreate')}
      />
    </SafeAreaView>
  );
};

NotesScreen.navigationOptions = {
  title: 'Notes'
};

NotesScreen.propTypes = {
  // required
  navigation: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0
  },
  surface: {
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 4
  }
});

export default NotesScreen;
