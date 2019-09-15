import { shallowMount } from '@vue/test-utils';
import Home from '../../src/views/Home.vue';
import Products from '../test_data/products';
import moxios from 'moxios';

describe('Home.vue', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('gets brands and categories correctly', () => {
    const wrapper = shallowMount(Home, {
      stubs: ['router-link']
    });

    wrapper.vm.isDataLoaded = true;
    wrapper.vm.products = Products;

    expect(wrapper.vm.brands.sort()).toEqual(['Nike', 'Adidas'].sort());
    expect(wrapper.vm.categories.sort()).toEqual(
      ['T-shirts', 'Trousers', 'Shoes'].sort()
    );
  });

  it('filters products correctly', () => {
    const wrapper = shallowMount(Home, {
      stubs: ['router-link']
    });

    wrapper.vm.isDataLoaded = true;
    wrapper.vm.products = Products;

    expect(wrapper.vm.filteredProducts).toEqual(Products);

    wrapper.vm.filtersApplied.brands = ['Nike'];

    expect(wrapper.vm.filteredProducts).toEqual(
      Products.filter(({ brand }) => brand === 'Nike')
    );

    wrapper.vm.filtersApplied.brands = ['Nike', 'Adidas'];

    expect(wrapper.vm.filteredProducts).toEqual(Products);

    wrapper.vm.filtersApplied.categories = ['Shoes'];

    expect(wrapper.vm.filteredProducts).toEqual(
      Products.filter(({ category }) => category === 'Shoes')
    );

    wrapper.vm.filtersApplied.categories = ['Shoes', 'Trousers'];

    expect(wrapper.vm.filteredProducts).toEqual(
      Products.filter(
        ({ category }) => category === 'Shoes' || category === 'Trousers'
      )
    );

    wrapper.vm.filtersApplied.categories = ['Shoes', 'Trousers'];
    wrapper.vm.filtersApplied.brands = ['Adidas'];

    expect(wrapper.vm.filteredProducts).toEqual(
      Products.filter(
        ({ category, brand }) =>
          brand === 'Adidas' &&
          (category === 'Shoes' || category === 'Trousers')
      )
    );

    wrapper.vm.filtersApplied.categories = ['Shoes', 'Trousers'];
    wrapper.vm.filtersApplied.brands = ['Adidas', 'Nike'];

    expect(wrapper.vm.filteredProducts).toEqual(
      Products.filter(
        ({ category, brand }) =>
          (brand === 'Adidas' || brand === 'Nike') &&
          (category === 'Shoes' || category === 'Trousers')
      )
    );

    wrapper.vm.filtersApplied.categories = ['Shoes', 'Trousers', 'T-shirts'];
    wrapper.vm.filtersApplied.brands = ['Adidas', 'Nike'];

    expect(wrapper.vm.filteredProducts).toEqual(Products);
  });

  it('sorts products correctly', () =>);
});
