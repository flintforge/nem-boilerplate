/**

 utility fourre-tout goes here

 */


// check if object is empty =={}
export function Empty(obj) {
	for (var property in obj)
		return false;
	return true;
}