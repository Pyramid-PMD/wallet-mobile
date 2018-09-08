import Colors from './Colors';

const ApplicationStyles = {
    layout: {
        centerContent: {
            flex: 1,
            // flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        contentWidth: {
            width: '90%'
        },
        justifyContentBetween: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        justifyContentStart: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }
    },
    typography: {
        textUnderlined: {
            textDecorationLine: 'underline',
        },
        number: {
            fontWeight: 'bold',
            fontSize: 18
        },
        numberBig: {
            fontSize: 28
        },
        smallText: {
            fontSize: 12
        },
        body: {
            fontSize: 14
        },
        secondaryText: {
            color: Colors.secondaryText
        },

    },
    checkboxList: {
        listItem: {
            borderBottomWidth: 0,
        },
        listItemBody: {
            borderColor: Colors.listBorderColor
        },
        listTextContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        checkbox: {
            marginRight: 34
        }
    },
    listChevronIcon: {
        marginRight: 0,
        fontSize: 40,
        paddingRight: 0,
        top: 2,
        left: 12
    },
    borders: {
        borderBottom: {
            borderBottomWidth: 1,
            borderColor: Colors.listBorderColor,
            paddingBottom: 14
        }
    },
    image: {
        responsive: {
            height: 200,
            width: '100%',
            backgroundColor: 'red'
        }
    },
    card: {
        borderRadius: 6,
        borderColor: 'transparent',
        overflow: 'hidden',
        backgroundColor: Colors.secondaryBackground,
        padding: 14
    }
};

export default ApplicationStyles;
