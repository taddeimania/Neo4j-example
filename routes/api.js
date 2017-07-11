'use strict';

module.exports = {
  route: (req, res) => {
    res.status(200).json({data: "stub"});
  },
  describe: {
    responses: {
      200: {
        description: "stub"
      }
    }
  }
}
