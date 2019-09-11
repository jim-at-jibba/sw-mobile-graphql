import * as React from 'react';
import { Snackbar } from 'react-native-paper';
import { AlertContext } from '../globalState';
import { colors } from '../constants';

const SnackBar = () => {
  const {
    setAlertOpen,
    isAlertOpen,
    alertType,
    alertMessage
  } = React.useContext(AlertContext);
  const [alertSyle, setAlertStyle] = React.useState({
    backgroundColor: colors.info
  });

  React.useEffect(() => {
    switch (alertType) {
      case 'info':
        setAlertStyle({
          backgroundColor: colors.success
        });
        break;
      case 'error':
        setAlertStyle({
          backgroundColor: colors.error
        });
        break;
      case 'success':
        setAlertStyle({
          backgroundColor: colors.success
        });
        break;
      default:
        setAlertStyle({
          backgroundColor: colors.info
        });
    }
  }, [alertType]);

  const closeMe = () => {
    setAlertOpen(false);
  };
  return (
    <>
      {typeof isAlertOpen === 'boolean' && (
        <Snackbar
          style={alertSyle}
          visible={isAlertOpen}
          onDismiss={() => closeMe()}
          action={{
            label: 'Undo',
            onPress: () => {
              console.log('HERE');
              // Do something
            }
          }}
        >
          {alertMessage}
        </Snackbar>
      )}
    </>
  );
};

export default SnackBar;
