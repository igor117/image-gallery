import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'
import TestComponent from '../components/TestComponent';
import Pagination from '../components/Pagination';

import {
  testDataSelector,
  fetchingSelector,
} from '../selectors/testSelector'

import { item } from '../actions'
import LoadingAnimation from '../components/LoadingAnimation'
import WithErrors from '../hocs/WithErrors'

import { PAGE_SIZE, FIRST_PAGE, PREV_PAGE, NEXT_PAGE, LAST_PAGE } from '../utils';

class TestContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      size: PAGE_SIZE,
      page: 1
    };

    this.onPageChange = this.onPageChange.bind(this);
  };

  static propTypes = {
    testData: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]).isRequired,
    fetching: PropTypes.bool,
    loadOne: PropTypes.func.isRequired,
  };

  static defaultProps = {
    fetching: false,
  };

  componentDidMount() {
    const { loadPhotos } = this.props
    loadPhotos();
  }

  paginate(page, size) {
    const { testData } = this.props;
    let data = testData.slice((page - 1) * size, page * size);
    return data;
  };

  onPageChange(type) {
    switch (type) {
      case FIRST_PAGE:
        this.firstPage();
        break;
      case PREV_PAGE:
        this.previousPage();
        break;
      case NEXT_PAGE:
        this.nextPage();
        break;
      case LAST_PAGE:
        this.lastPage();
        break;
      default:
        this.firstPage();
        break;        
    }
  };

  firstPage() {
    this.setState({ page: 1 });
  };

  lastPage() {
    const { testData } = this.props;
    let page = Math.floor(testData.length / PAGE_SIZE) + 1;
    this.setState({ page: page });
  };

  previousPage() {
    const { page } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      this.setState({ page: newPage });
    }
  }

  nextPage() {
    const { testData } = this.props;
    const { page } = this.state;
    let totalPages = Math.floor(testData.length / PAGE_SIZE) + 1;
    if (page < totalPages) {
      const newPage = page + 1;
      this.setState({ page: newPage });
    }
  }

  render() {
    const { testData, fetching } = this.props;
    const { page, size } = this.state;
    let count = testData.filter(item => item.favourite).length;
    let pageData = this.paginate(page, size);

    if (fetching) return <LoadingAnimation />

    return (
      <div>
        <h1>{`Favourite Count: ${count}`}</h1>
        {pageData && <TestComponent data={pageData} page={page} />}
        <Pagination onPageChange={(type) => this.onPageChange(type)} />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  testData: testDataSelector(),
  fetching: fetchingSelector(),
})

const mapDispatchToProps = {
  loadOne: item.requestOne,
  loadPhotos: item.getPhotos
}

export default compose(
  WithErrors,
  connect(mapStateToProps, mapDispatchToProps),
)(TestContainer)
