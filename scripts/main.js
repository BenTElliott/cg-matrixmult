var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform equal to it
    // otherwise multiply all matrices together (in proper order)
    // `compound_transform = Matrix.multiply(...)`
    var tranform_matrices = [];
	
    compound_transform = new Matrix(4, 4); // change / remove this
	if(transforms.length == 1)
	{
		compound_transform = transforms[0];
	}
	else if(transforms.length > 1)
	{
		compound_transform = transforms[0].mat4x4;
		for(var i = 1; i < transforms.length; i++)
		{
			tranform_matrices.push(transforms[i].mat4x4);
		}
		compound_transform = Matrix.multiply(tranform_matrices);
		console.log(compound_transform);
	}

    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    // `final_vertex = Matrix.multiply(...)`
	var hold = [];
	hold[0] = CalculateCompoundTransform(app.transforms);
	hold[1] = vertex;
    var final_vertex = Matrix.multiply(hold); 
	
    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    // update `app.transforms[index].mat4x4`
	if(type.toLowerCase() == "translate") 
	{
		Mat4x4Translate(app.transforms[index].mat4x4, values[0], values[1], values[2]);
	}
    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
