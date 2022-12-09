const asyncHandler = require("express-async-handler");
const ErrorApi = require("../utils/errorApi");
const ApiFeatures = require("../utils/apiFeatures");

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ErrorApi(`No ${Model} for this id ${id}`, 404));
    }

    // // Trigger "remove" event when update document
    // document.remove();
    res.status(200).json({ data: document });
  });
