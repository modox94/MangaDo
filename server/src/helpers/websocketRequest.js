const websocketResponse = require('./websocketResponse');
const Psd = require('../models/psd.modele');
const Mark = require('../models/mark.modele');
const ACTION_TYPES = require('../action-types');

async function websocketRequest(data) {
  switch (data.type) {
    case ACTION_TYPES.WS_ADD_MARK:
      console.log('data.payload.mark', data.payload.mark);

      let newMark = await new Mark(data.payload.mark).save();

      return await Psd.findOneAndUpdate(
        { url: data.payload.url },
        { $addToSet: { marks: newMark._id } }
      );

    case ACTION_TYPES.WS_ADD_MESSAGE_MARK:
      break;

    case ACTION_TYPES.WS_CHANGE_COORDS_MARK:
      console.log('data.payload', data.payload);

      let newmark = await Mark.findOneAndUpdate(
        { id: data.payload.id },
        {
          position: data.payload.position,
        }
      );

      console.log('newmark', newmark);
      return;

    case ACTION_TYPES.WS_CHANGE_VISIBLE_MARK:
      break;

    case ACTION_TYPES.WS_DELETE_MARK:
      break;

    default:
      break;
  }
}

module.exports = websocketRequest;
