import React, {Component} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {View, Text, Button} from "native-base";
import BonusChartActions, {BonusChartSelectors} from "./BonusChartRedux";
import {connect} from "react-redux";
import BonusChartStyles from "./BonusChartStyles";
import {
    LineChart
} from 'react-native-chart-kit'
import Colors from "../../../Theme/Colors";

class BonusChart extends Component {
    state = {
        interval: 0
    };

    componentDidMount() {
        this.onIntervalSelected(0);
    }

    render() {
        const {chart} = this.props;
        return(
            <View style={{backgroundColor: Colors.profitChartColor}}>
                {chart ? this.renderChart(chart) : this.renderChartLoading()}
                <View style={[BonusChartStyles.chartButtonsContainer]}>
                    <Button
                        transparent
                        style={[BonusChartStyles.chartButton]}
                        onPress={this.onIntervalSelected.bind(this, 0)}>
                        <Text style={this.getActiveButtonStyle(0)}>3 days</Text>
                    </Button>

                    <Button
                        transparent
                        style={[BonusChartStyles.chartButton]}
                        onPress={this.onIntervalSelected.bind(this, 1)}>
                        <Text style={this.getActiveButtonStyle(1)}>7 days</Text>
                    </Button>

                    <Button
                        transparent
                        style={[BonusChartStyles.chartButton]}
                        onPress={this.onIntervalSelected.bind(this, 2)}>
                        <Text style={this.getActiveButtonStyle(2)}>1 month</Text>
                    </Button>

                    <Button
                        transparent
                        style={[BonusChartStyles.chartButton]}
                        onPress={this.onIntervalSelected.bind(this, 3)}>
                        <Text style={this.getActiveButtonStyle(3)}>All</Text>
                    </Button>
                </View>
            </View>
        );
    }


    onIntervalSelected(interval) {
        this.setState({interval});
        const {walletAddress, getBonusChart} = this.props;
        console.log('address', walletAddress);
        getBonusChart(walletAddress, interval);
        this.refs._chartScrollView && this.refs._chartScrollView.scrollTo({x: 0, y: 0});
    }

    getActiveButtonStyle(interval) {
        if (interval !== this.state.interval) {
            return [BonusChartStyles.chartButtonText];
        }
        return [BonusChartStyles.chartButtonText, BonusChartStyles.chartButtonActiveText];
    }

    renderChartLoading() {
        return (
            <View style={{flex:1, height: 220, alignItems: 'center', justifyContent: 'center'}}>
                <Text>loading chart data</Text>
            </View>
        )
    }

    renderChart(chart) {
        const screenWith = Dimensions.get('window').width;
        const width = chart.date.length < 4 ? screenWith : (chart.date.length / 4) * screenWith;
        return (
            <ScrollView horizontal contentContainerStyle={{width, height: 220}} ref="_chartScrollView">
                <LineChart
                    data={{
                        labels: chart.date,
                        datasets: [{
                            data: chart.bonus
                        }]
                    }}
                    width={width} // from react-native
                    height={220}
                    chartConfig={{
                        backgroundColor: Colors.profitChartColor,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        backgroundGradientFrom: Colors.profitChartColor,
                        backgroundGradientTo: Colors.profitChartColor,
                        color: (opacity = 1) => `rgba(90,190,190, ${opacity})`,
                        style: {
                            backgroundColor: 'red',
                            borderRadius: 16
                        }
                    }}
                    bezier
                    style={{
                        borderRadius: 0
                    }}
                />
            </ScrollView>

        )
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

