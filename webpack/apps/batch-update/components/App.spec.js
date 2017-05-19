import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import App from './App'

it('renders correctly', () => {
  const app = renderer.create(<App />)
  const tree = app.toJSON()
  expect(tree).toMatchSnapshot()
})

let app

beforeEach(() => {
  const fetchArtworksPromise = new Promise(() => {})
  window.fetch = jest.fn(() => fetchArtworksPromise)

  const wrapper = shallow(<App />)
  app = wrapper.instance()
})

describe('state mutations', () => {
  describe('search criteria', () => {
    test('genes can be added and removed', () => {
      const gene1 = { id: 'one', name: 'One' }
      const gene2 = { id: 'two', name: 'Two' }

      app.onAddGene(gene1)
      app.onAddGene(gene2)
      expect(app.state).toMatchObject({
        genes: [ gene1, gene2 ]
      })

      app.onRemoveGene('One')
      expect(app.state).toMatchObject({
        genes: [ gene2 ]
      })
    })

    test('tags can be added and removed', () => {
      const tag1 = { id: 'one', name: 'One' }
      const tag2 = { id: 'two', name: 'Two' }

      app.onAddTag(tag1)
      app.onAddTag(tag2)
      expect(app.state).toMatchObject({
        tags: [ tag1, tag2 ]
      })

      app.onRemoveTag('One')
      expect(app.state).toMatchObject({
        tags: [ tag2 ]
      })
    })

    test('arbitrary state keys can be set and cleared', () => {
      app.updateStateFor('foo', 'bar')
      expect(app.state).toMatchObject({
        foo: 'bar'
      })

      app.clearStateFor(null, 'foo')
      expect(app.state).toMatchObject({
        foo: null
      })
    })
  })

  describe('artwork selection', () => {
    test('individual artworks can be toggled', () => {
      const work = { id: 'guernica', name: 'Guernica' }

      app.onToggleArtwork(work)
      expect(app.state).toMatchObject({
        selectedArtworkIds: ['guernica']
      })

      app.onToggleArtwork(work)
      expect(app.state).toMatchObject({
        selectedArtworkIds: []
      })
    })

    test('the full list of artworks can be selected and deselected', () => {
      const work1 = { id: 'guernica', name: 'Guernica' }
      const work2 = { id: 'soup-can', name: 'Soup Can' }
      app.setState({ artworks: [ work1, work2 ] })

      app.onSelectAllArtworks()
      expect(app.state).toMatchObject({
        selectedArtworkIds: ['guernica', 'soup-can']
      })

      app.onDeselectAllArtworks()
      expect(app.state).toMatchObject({
        selectedArtworkIds: []
      })
    })
  })

  describe('artwork preview', () => {
    const work1 = { id: 'guernica', name: 'Guernica' }
    const work2 = { id: 'soup-can', name: 'Soup Can' }
    const work3 = { id: 'shark', name: 'Shark' }

    beforeEach(() => {
      app.setState({ artworks: [ work1, work2, work3 ] })
    })

    test('an artwork can be selected for preview', () => {
      app.onPreviewArtwork(work2)
      expect(app.state).toMatchObject({
        previewedArtwork: work2
      })
    })

    test('the previous artwork can be selected for preview', () => {
      app.onPreviewArtwork(work2)
      app.onPreviewPrevious()
      expect(app.state).toMatchObject({
        previewedArtwork: work1
      })
    })

    test('the next work can be selected for preview', () => {
      app.onPreviewArtwork(work2)
      app.onPreviewNext()
      expect(app.state).toMatchObject({
        previewedArtwork: work3
      })
    })
  })
})
