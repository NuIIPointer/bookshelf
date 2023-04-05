import { Layout, useTheme, Text, Icon, Modal, Card, Button } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';

const BarcodeScanner = ({ setCode }: { setCode: Function }) => {
    const theme = useTheme();

    const [hasPermission, setHasPermission] = useState(null);
    const [openModal, setOpenModal] = useState(Platform.OS !== 'web');

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        const isbnRegex = new RegExp(
            /^(?:ISBN(?:-1[03])?:?●)?(?=[0-9X]{10}$|(?=(?:[0-9]+[-●]){3})[-●0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[-●]){4})[-●0-9]{17}$)(?:97[89][-●]?)?[0-9]{1,5}[-●]?[0-9]+[-●]?[0-9]+[-●]?[0-9X]$/
        );
        console.log('type', typeof type, type);
        if (type?.includes('EAN-13') && data?.match(isbnRegex)) {
            setOpenModal(false);
            setCode(data);
            alert(`Bar code with type ${type} and data ${data} ${typeof data} has been scanned!`);
        }
    };

    const onPress = () => {
        // alert('test');
        setOpenModal(true);
    };

    // alert(openModal);

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <>
            <Button
                // style={styles.button}#
                disabled={Platform.OS === 'web'}
                onPress={onPress}
                accessoryLeft={<Icon name="camera" fill="#fff" />}
            />
            <Modal
                visible={openModal}
                // onBackdropPress={() => setOpenModal(false)}
                // backdropStyle={styles.modalBackdrop}
            >
                <Card>
                    <Layout>
                        <BarCodeScanner
                            onBarCodeScanned={handleBarCodeScanned}
                            style={{ height: 200, width: 200 }}
                        />
                    </Layout>
                </Card>
            </Modal>
        </>
    );
};

export default BarcodeScanner;
