describe('Tests for visibility settings with the classic editor', () => {
	beforeEach(() => {
		cy.logInToWordPress('admin', 'password');
	})

	it('Checks that visibility settings of a post can be changed in the classic editor', () => {
		cy.visit('/wp-admin/post.php?post=99&action=edit')

		// Select checked option.
		cy
			.get('#coil input[type="radio"]')
			.then(options => {
				if (options[0].checked) {
					return options[0];
				} else {
					return options[1];
				}
			})
			.as('checkedOptionText')

		// Select an unchecked option.
		cy
			.get('#coil input[type="radio"]')
			.then(options => {
				if (options[0].checked) {
					return options[1];
				} else {
					return options[0];
				}
			})
			.check()

		cy
			.get('#publish')
			.click();

		// Check that the original checkbox is not checked.
		cy
			.get('@checkedOptionText')
			.then((checkedOptionText) => {
				cy
					.contains(checkedOptionText)
					.prev()
					.should('not.be.checked')
			})
	})
})
