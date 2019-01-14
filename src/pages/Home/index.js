import React, { Component } from 'react';
import { View,Text,Button} from 'react-native';
import { connect } from 'react-redux';


@connect(({Home}) => ({
  ...Home,
}))
export default class Home extends Component {
  

  componentDidMount(){
    const {dispatch} = this.props
      dispatch({type:'Home/effectsDemo'})
  }

  render() {
    return (
      <View>
        <Text>Home</Text>

          <Button
              onPress={()=>{
                // router.toDetail()
                  router.toLogin()
              }}
              title={'跳转到登录'}/>
      </View>
    )
  }
}
