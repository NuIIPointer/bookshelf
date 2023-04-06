import { useHeaderHeight } from '@react-navigation/elements';
import { KeyboardAvoidingView, Platform } from 'react-native';

const KeyboardAvoidingComponents = ({ children }: { children: any }) => {
    const height = useHeaderHeight();
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={height}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            {children}
        </KeyboardAvoidingView>
    );
};

export default KeyboardAvoidingComponents;
