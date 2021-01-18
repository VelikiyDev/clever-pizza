import React, {useEffect} from "react";
import {connect, useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {ProductCard} from "../ui/ProductCard";
import {productFetchList} from "../../actions/products.actions";

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export const List = connect(mapStateToProps, {productFetchList})(({products, productFetchList}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(productFetchList())
  },[productFetchList, dispatch])

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {products.list.map(item => {
            return <ProductCard key={item._id} data={{...item}}/>
          })}
        </Grid>
      </Container>
    </>
  )
})