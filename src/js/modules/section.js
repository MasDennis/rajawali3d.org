class Section {
  
  constructor(name) {
  	this.name = name;  
  }
  
  init() {
  	console.log('Section inited: ', name);
  }

  getName() {
  	return this.name;
  }

}

module.exports = function(name) {
    return new Section(name);
}