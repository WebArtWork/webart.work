const path = require("path");

module.exports.intern = (intern) => {
	intern.title = intern.name + " | Web Art Work";

	if (intern.thumb) {
		intern.image = "https://api.webart.work" + intern.thumb;
	}

	intern.__folderPath = path.join(process.cwd(), "intern");

	intern.__filePath = intern.url || intern._id;

	return intern;
};

module.exports.partner = (partner) => {
	partner.title = partner.name + " | Web Art Work";

	if (partner.thumb) {
		partner.image = "https://api.webart.work" + partner.thumb;
	}

	partner.__folderPath = path.join(process.cwd(), "partner");

	partner.__filePath = partner.url || partner._id;

	return partner;
};
