import {
    Icon,
    Layout,
    MenuItem,
    OverflowMenu,
    TopNavigation,
    TopNavigationAction,
    useStyleSheet,
} from '@ui-kitten/components';
import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { AppContext } from '../Context/App.Context';

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const EditIcon = (props) => <Icon {...props} name="edit" />;

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

const TopNavigationCustom = () => {
    const { topNavigationHeight } = useContext(AppContext);
    const [menuVisible, setMenuVisible] = React.useState(false);
    const styles = useStyleSheet(themedStyles);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const renderMenuAction = () => <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />;

    const renderRightActions = () => (
        <>
            <TopNavigationAction icon={EditIcon} />
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}>
                <MenuItem accessoryLeft={InfoIcon} title="About" />
                <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
            </OverflowMenu>
        </>
    );

    const renderBackAction = () => <TopNavigationAction icon={BackIcon} />;

    const onLayoutResize = (event: any) => {
        const { width } = event.nativeEvent.layout;
        topNavigationHeight.current = width;
        console.log('on resize', width);
    };

    return (
        <Layout style={styles.container} level="1" onLayout={onLayoutResize}>
            <TopNavigation
                alignment="center"
                title="Eva Application"
                subtitle="Subtitle"
                accessoryLeft={renderBackAction}
                accessoryRight={renderRightActions}
            />
        </Layout>
    );
};

export default TopNavigationCustom;

const themedStyles = StyleSheet.create({
    container: {
        paddingTop: 48,
        paddingHorizontal: 12,
        backgroundColor: 'color-primary-500',
    },
});
