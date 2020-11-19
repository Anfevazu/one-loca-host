import React , { Component } from 'react';
import Heading from 'components/UI/Heading/Heading';
import TextLink from 'components/UI/TextLink/TextLink';
import Container from 'components/UI/Container/Container';
import { PostPlaceholder } from 'components/UI/ContentLoader/ContentLoader';
import SectionGrid from 'components/SectionGrid/SectionGrid';
import SectionTitle from 'components/SectionTitle/SectionTitle';
import { LISTING_POSTS_PAGE, SINGLE_POST_PAGE } from 'settings/constant';
import {firestore} from '../../../firebaseConfig';


export default class TopHotelsGrid extends Component {
  state = {
    dataHoust: [],
    loading: true,
    post: []
  };

  componentDidMount = () => {
    let houstList = [];
    firestore.collection("houst").orderBy("rating", "desc").limit(10).get()
    .then((querySnapshot) =>{
      querySnapshot.forEach((doc)=> {
          houstList.push(doc.data())
      });
      this.setState({dataHoust: houstList, loading: false})
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
  }

render(){
  return (
    <Container fluid={true}>
      <SectionTitle
        title={<Heading content="Mejores houst" />}
        link={<TextLink link={LISTING_POSTS_PAGE} content="Ver Mas" />}
      />
      <SectionGrid
        link={SINGLE_POST_PAGE}
        columnWidth={[1 / 1, 1 / 2, 1 / 3, 1 / 4, 1 / 5]}
        data={this.state.dataHoust}
        loading={this.loading}
        limit={10}
        placeholder={<PostPlaceholder />}
      />
    </Container>
  )};
};
