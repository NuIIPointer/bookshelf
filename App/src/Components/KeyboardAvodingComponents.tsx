import { useHeaderHeight } from '@react-navigation/elements';
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const KeyboardAvoidingComponents = ({ children }: { children: any }) => {
    const height = useHeaderHeight();
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={height}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {children}
        </KeyboardAvoidingView>
    );
};

export default KeyboardAvoidingComponents;
