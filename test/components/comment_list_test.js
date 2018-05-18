import {renderComponent, expect } from '../test_helper';
import CommentList from '../../src/components/comment_list';


describe('comment_list', () => {
	let component;

  beforeEach(() => {
  	const props = { comments: ['New Comment', 'Second Comment'] }
    component = renderComponent(CommentList, null, props);
  });

	// it('has the correct class', () => {
	// 	expect(component).to.have.class('comment-list');
	// });

	// it('has a ul', () => {
	// 	expect(component.find('ul')).to.exist;
	// });

	it('shows an LI for each comment', () => {
		expect(component.find('li').length).to.equal(2);
	});

	it('shows each comment that is provided', () => {
		expect(component).to.contain('New Comment');
		expect(component).to.contain('Second Comment');
	});


	// describe('adding comments', () => {
	// 	beforeEach(() => {
	// 		component.find('textarea').simulate('change', 'new comment');
	// 	});



	// });


});