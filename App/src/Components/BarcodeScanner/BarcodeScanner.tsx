import {
    Layout,
    useTheme,
    Text,
    Icon,
    Modal,
    Card,
    Button,
    useStyleSheet,
} from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect, useCallback } from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';

const BarcodeScanner = ({ setCode }: { setCode: Function }) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();

    useEffect(() => {
        if (openModal) {
            Keyboard.dismiss();
        }
    }, [openModal]);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
        const isbnRegex = new RegExp(
            /^(?:ISBN(?:-1[03])?:?●)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-●]){3})[-●0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)(?:97[89][-●]?)?[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9X]$/
        );
        if (type?.includes('EAN-13') && data?.match(isbnRegex)) {
            setOpenModal(false);
            setCode(data);
        }
    };

    const onPress = useCallback(() => {
        setOpenModal(!openModal);
    }, [openModal]);

    if (hasPermission === null || hasPermission === false) {
        return null;
    }

    return (
        <>
            <Button
                style={styles.button}
                disabled={Platform.OS === 'web'}
                onPress={onPress}
                accessoryLeft={
                    <Icon name={openModal ? 'close' : 'camera'} fill={theme['color-shade-800']} />
                }
            />
            <Modal
                visible={openModal}
                onBackdropPress={() => setOpenModal(false)}
                backdropStyle={styles.modalBackdrop}>
                <Card>
                    <Layout>
                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={styles.barcodeCamera}
                        />
                    </Layout>
                </Card>
            </Modal>
        </>
    );
};

const themedStyles = StyleSheet.create({
    modalBackdrop: {
        backgroundColor: 'rgba(0,0,0,0.25)',
    },
    barcodeCamera: {
        height: 200,
        width: 300,
    },
    button: {
        backgroundColor: 'color-basic-100',
        paddingHorizontal: 4,
    },
});

export default BarcodeScanner;
