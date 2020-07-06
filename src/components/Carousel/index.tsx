/* eslint-disable react/no-did-update-set-state */
import { PureComponent, ReactNode } from 'react'
import {
  Text,
  ScrollView,
  StyleProp,
  ViewStyle,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent
} from 'react-native'
import { range } from 'utils/Helpers'
import styles from './styles'

interface Props {
  interval: number
  children: ReactNode
  style: StyleProp<ViewStyle>
  slideStyle: StyleProp<ViewStyle>
  dotted: boolean
  onChangeInterval: (
    interval: number,
    event?: NativeSyntheticEvent<NativeScrollEvent>
  ) => void
}

interface State {
  interval: number
  intervals: number
  width: number
  offset: number
  change: boolean
}

class Carousel extends PureComponent<Props, State> {
  public static defaultProps: Partial<Props> = {
    interval: 1,
    style: {},
    slideStyle: {},
    dotted: false,
    onChangeInterval: () => {}
  }

  public scrollRef = window.React.createRef<ScrollView>()

  constructor(props: Props) {
    super(props)
    this.state = {
      interval: props.interval || 1,
      intervals: 1,
      width: 0,
      offset: 0,
      change: true
    }
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    const { interval: intervalProps, onChangeInterval } = this.props
    const { interval: intervalState } = this.state
    if (prevState.interval !== intervalState) {
      onChangeInterval(intervalState)
    } else if (prevProps.interval !== intervalProps) {
      const { width, intervals } = this.state
      this.setState({
        interval: intervalProps,
        change: false
      })
      this.scrollRef.current?.scrollTo({
        x: this.getOffset(width, intervals, intervalProps - 1)
      })
    }
  }

  private getInterval(offset: number): number {
    const { intervals, width } = this.state
    for (let i = 0; i < intervals; i++) {
      if (offset < (width / intervals) * i) {
        return i + 1
      }
    }
    return 1
  }

  private getOffset(
    width: number,
    intervals: number,
    interval: number
  ): number {
    return (width / intervals) * interval
  }

  private onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const { contentSize, contentOffset } = event.nativeEvent
    const interval = this.getInterval(contentOffset.x)
    const { change } = this.state
    if (change) {
      this.setState({
        interval,
        width: contentSize.width
      })
    }
  }

  private onChange = (event: NativeSyntheticEvent<NativeScrollEvent>): void => {
    const { onChangeInterval = () => {} } = this.props
    const interval = this.getInterval(event.nativeEvent.contentOffset.x)
    this.setState({ interval, change: true })
    onChangeInterval(interval, event)
  }

  private onContentSizeChange = (width: number): void => {
    const { children } = this.props
    const intervals = (children as JSX.Element[]).length
    this.setState({
      width,
      intervals
    })
  }

  private renderDots(): JSX.Element {
    const { interval, intervals } = this.state
    return (
      <View style={styles.dots}>
        {range(0, intervals).map((num: number) =>
          num < intervals ? (
            <Text
              key={num + 1}
              style={[
                styles.dot,
                { opacity: interval === num + 1 ? 0.5 : 0.1 }
              ]}
            >
              &bull;
            </Text>
          ) : null
        )}
      </View>
    )
  }

  public render(): JSX.Element {
    const { children, slideStyle, dotted } = this.props
    const { intervals } = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          horizontal={true}
          ref={this.scrollRef}
          decelerationRate="fast"
          onScroll={this.onScroll}
          onScrollEndDrag={this.onChange}
          scrollEventThrottle={200}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={this.onContentSizeChange}
          contentContainerStyle={[
            styles.scrollView,
            { width: `${100 * intervals}%` }
          ]}
        >
          {(children as JSX.Element[]).map((child, idx) => (
            <View key={idx} style={[styles.slide, slideStyle]}>
              {child}
            </View>
          ))}
        </ScrollView>
        {dotted && this.renderDots()}
      </View>
    )
  }
}

export default Carousel
