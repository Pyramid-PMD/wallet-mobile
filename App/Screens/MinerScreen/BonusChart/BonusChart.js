import React, {Component} from 'react';
import {View, Text, Button} from "native-base";
import BonusChartActions, {BonusChartSelectors} from "./BonusChartRedux";
import {connect} from "react-redux";
import PropTypes from 'prop-types';


class BonusChart extends Component {
    state = {
        interval: 0
    };

    componentDidMount() {
        this.onIntervalSelected(0);
    }

    onIntervalSelected(interval) {
        this.setState({interval});
        const {walletAddress, getBonusChart} = this.props;
        console.log('address', walletAddress);
        getBonusChart(walletAddress, interval);
    }

    render() {
        return(
            <View>
                <Text>Bonus chart</Text>
                <View>
                    <Button onPress={this.onIntervalSelected.bind(this, 0)}>
                        <Text>3 days</Text>
                    </Button>

                    <Button onPress={this.onIntervalSelected.bind(this, 1)}>
                        <Text>7 days</Text>
                    </Button>

                    <Button onPress={this.onIntervalSelected.bind(this, 2)}>
                        <Text>1 month</Text>
                    </Button>

                    <Button onPress={this.onIntervalSelected.bind(this, 3)}>
                        <Text>All</Text>
                    </Button>
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chart: BonusChartSelectors.selectChart(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBonusChart: (address, interval) => dispatch(BonusChartActions.bonusRequest(address, interval))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(BonusChart);

