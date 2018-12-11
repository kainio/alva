import * as Model from '../model';
import * as Types from '../types';
import * as uuid from 'uuid';
test('get and render element actions', () => {
	const project = Model.Project.create({
		name: 'test',
		path: 'my/path',
		draft: true
	});
	const libraries = Model.Project.createBuiltinPatternLibrary();
	const patterns = libraries.getPatterns();
	const linkPattern = patterns.filter(p => p.getType() === Types.PatternType.SyntheticLink);
	const mockElement = Model.Element.fromPattern(linkPattern[0], {
		dragged: false,
		contents: [],
		project
	});
	const mockPropId = linkPattern[0].getId();
	mockElement.setPropertyValue(mockPropId, [uuid.v4().toString()]);
	const elementValues = mockElement.getPropertyValue(mockPropId);
	expect(elementValues).toHaveLength(1);
	const elementActions = Array.isArray(elementValues)
		? elementValues.map((v: any) => project.getElementActionById(v))
		: new Array(elementValues);
	console.log(elementActions);

	// elementActions.forEach((action: any) => {
	// 	console.log(action);
	// });
	console.log(elementValues);
});
