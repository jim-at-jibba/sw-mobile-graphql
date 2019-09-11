import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Text, Title, Paragraph, Surface, Caption } from 'react-native-paper';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { gStyle } from '../constants';

const GET_NOTE = gql`
  query GET_NOTE($id: ID!) {
    notes(where: { id: $id }) {
      id
      title
      note
      createdAt
    }
  }
`;

const NoteScreen = ({ navigation }) => {
  const { id } = navigation.state.params;
  const { data, loading, error } = useQuery(GET_NOTE, { variables: { id } });
  const [note, setNote] = React.useState(null);

  React.useEffect(() => {
    if (data && data.notes) {
      console.log('data', data);
      setNote(data.notes);
    } else if (error) {
      console.log('Error', error);
      // Add error handling here
    }
  }, [data, error]);

  return (
    <SafeAreaView style={gStyle.container}>
      <ScrollView contentContainerStyle={gStyle.contentContainer}>
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
          {loading ? (
            <View>
              <Text>Loading</Text>
            </View>
          ) : (
            <Surface style={styles.surface}>
              <View style={styles.textWrapper}>
                {note && (
                  <>
                    <Title>{note.title}</Title>
                    <Caption>{`Created: ${note.createdAt}`}</Caption>
                    <Paragraph>{note.note}</Paragraph>
                  </>
                )}
              </View>
            </Surface>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

NoteScreen.navigationOptions = {
  title: 'Note'
};

NoteScreen.propTypes = {
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
  textWrapper: {
    padding: 10
  },
  surface: {
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 4
  }
});

export default NoteScreen;
