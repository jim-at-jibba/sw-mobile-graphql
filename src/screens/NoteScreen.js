import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Title, Paragraph, Surface, FAB, Caption } from 'react-native-paper';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { gStyle } from '../constants';
import { getNote } from '../graphql/queries';
import { AlertContext } from '../globalState';

const NoteScreen = ({ navigation }) => {
  const { dispatchAlert } = React.useContext(AlertContext);
  const [note, setNote] = React.useState(null);
  const { data, loading, error } = useQuery(gql(getNote), {
    variables: { id: navigation.state.params.id }
  });

  React.useEffect(() => {
    if (data && data.getNote) {
      setNote(data.getNote);
    } else if (error) {
      dispatchAlert({
        type: 'open',
        alertType: 'error',
        message: 'Error creating note'
      });
    }
  }, [data, error]);

  return (
    <SafeAreaView style={gStyle.container}>
      <ScrollView contentContainerStyle={gStyle.contentContainer}>
        <View style={{ flex: 1, height: '100%', width: '100%' }}>
          {note && (
            <Surface style={styles.surface}>
              <View style={styles.textWrapper}>
                <Title>{note.title}</Title>
                <Caption>Created: {note.createdAt}</Caption>
                <Paragraph>{note.note}</Paragraph>
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
