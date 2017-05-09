import React from 'react'
import renderer from 'react-test-renderer'
import moment from 'moment'
import SearchForm from './SearchForm'

let props

beforeEach(() => {
  props = {
    artworksCount: 0,
    createdAfterDate: null,
    deletedFilter: 'SHOW_ALL',
    fair: null,
    genes: [],
    genomedFilter: 'SHOW_ALL',
    onAddGene: jest.fn(),
    onAddTag: jest.fn(),
    onClearFair: jest.fn(),
    onClearPartner: jest.fn(),
    onRemoveGene: jest.fn(),
    onRemoveTag: jest.fn(),
    onSetDeletedFilter: jest.fn(),
    onSetFair: jest.fn(),
    onSetGenomedFilter: jest.fn(),
    onSetPartner: jest.fn(),
    onSetPublishedFilter: jest.fn(),
    partner: null,
    publishedFilter: 'SHOW_ALL',
    selectedArtworksCount: 0,
    tags: []
  }
})

it('renders correctly', () => {
  const rendered = renderer.create(<SearchForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('does not render partner autosuggest if partner is already selected', () => {
  const partner = { id: 'nice-gallery', name: 'Nice Gallery' }
  Object.assign(props, { partner })
  const rendered = renderer.create(<SearchForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('does not render fair autosuggest if fair is already selected', () => {
  const fair = { id: 'nice-fair', name: 'Nice Fair' }
  Object.assign(props, { fair })
  const rendered = renderer.create(<SearchForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('does not render createdAfterDate input if createdAfterDate is already entered', () => {
  const createdAfterDate = moment('2020-01-01T12:00:00-00:00').utc()
  Object.assign(props, { createdAfterDate })
  const rendered = renderer.create(<SearchForm {...props} />)
  const tree = rendered.toJSON()
  expect(tree).toMatchSnapshot()
})

it('uses the correct utcOffset', () => {
  expect(moment().utc().utcOffset()).toEqual(0)
})

describe('"edit artworks" button', () => {
  it('does not render an edit button if there are no artworks', () => {
    Object.assign(props, { artworksCount: 0 })
    const rendered = renderer.create(<SearchForm {...props} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders a disabled edit button if there are artworks, but none selected', () => {
    Object.assign(props, { artworksCount: 100, selectedArtworksCount: 0 })
    const rendered = renderer.create(<SearchForm {...props} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders an enabled edit button if there are selected artworks', () => {
    Object.assign(props, { artworksCount: 100, selectedArtworksCount: 1 })
    const rendered = renderer.create(<SearchForm {...props} />)
    const tree = rendered.toJSON()
    expect(tree).toMatchSnapshot()
  })
})