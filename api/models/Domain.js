const mongoose = require("mongoose");
const { BadRequestError } = require("../errors");

const DomainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Other fields specific to the Domain model
});

// Static method to add a new domain
DomainSchema.statics.addDomain = async function (domainData) {
  const domain = this.findOne(domainData);
  // if (domain) throw new BadRequestError("domain name already exists");

  const newDomain = new this(domainData);
  await newDomain.save();
  return newDomain;
};

DomainSchema.statics.getDomains = async function () {
  const domains = await this.find();
  return domains;
};

const Domain = mongoose.model("Domain", DomainSchema);

module.exports = Domain;
