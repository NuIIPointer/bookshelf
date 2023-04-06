import { useHeaderHeight } from '@react-navigation/elements';
import { KeyboardAvoidingView, Platform } from 'react-native';

const KeyboardAvoidingComponents = ({ children }: { children: any }) => {
    const height = useHeaderHeight();
    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={height + 100}
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
            {children}
        </KeyboardAvoidingView>
    );
};

export default KeyboardAvoidingComponents;
