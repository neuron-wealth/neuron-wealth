const RECORD_STATUSES = ["New", "In review", "Closed"];

const withId = {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString();
    return ret;
  },
};

module.exports = { RECORD_STATUSES, withId };
