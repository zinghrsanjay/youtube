import React from "react";
import {Grid} from '@material-ui/core'
import { SearchBar, VideoList, VideoDetail } from "./components";
import youtube from './api/youtube'
class App extends React.Component{
  state ={
    videos:[],
    selectedVideo : null,
  }
  componentDidMount(){
    this.handleSubmit('hindi song');
  }
  onVideoSelect =(video)=>{
this.setState({selectedVideo:video});
  }
  handleSubmit = async(searchTerm)=>{
const response = await youtube.get('search',{
  params:{
    part : 'snippet',
    maxResult :5,
    key :'AIzaSyAOLuOjKRdY0qWAF6ThVqz20NZcF_55DvY',
    q:searchTerm,
}
} );
this.setState({videos:response.data.items,selectedVideo:response.data.items[0]});
}
  render(){
   // const selectedVideo = this.state;
    return(
      <Grid style={{ justifyContent: "center" }} container spacing={10}>
      <Grid item xs={11}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onFormSubmit={this.handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetail video={this.state.selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    )
  }

}
export default App