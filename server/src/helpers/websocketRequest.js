const Psd = require('../models/psd.modele');
const Mark = require('../models/mark.modele');
const ACTION_TYPES = require('../action-types');

async function websocketRequest(data) {
  switch (data.type) {
    case ACTION_TYPES.WS_ADD_MARK: {
      const newMark = await new Mark(data.payload.mark).save();

      return await Psd.findOneAndUpdate(
        { url: data.payload.url },
        { $addToSet: { marks: newMark._id } }
      );
    }

    case ACTION_TYPES.WS_ADD_MESSAGE_MARK:
      return await Mark.findOneAndUpdate(
        { id: data.payload.id },
        { $addToSet: { messages: data.payload.message } }
      );

    case ACTION_TYPES.WS_CHANGE_COORDS_MARK:
      return await Mark.findOneAndUpdate(
        { id: data.payload.id },
        { position: data.payload.position }
      );

    case ACTION_TYPES.WS_CHANGE_VISIBLE_MARK:
      return await Mark.findOneAndUpdate(
        { id: data.payload.id },
        { visible: data.payload.visible }
      );

    case ACTION_TYPES.WS_DELETE_MARK: {
      const markToDel = await Mark.findOneAndDelete(
        { id: data.payload.id },
        { visible: data.payload.visible }
      );

      let psdToEdit = await Psd.findOne({ url: data.payload.url });

      psdToEdit.marks = psdToEdit.marks.filter((markId) => {
        if (String(markId) === String(markToDel._id)) {
          return false;
        } else {
          return true;
        }
      });

      return await psdToEdit.save();
    }

    case ACTION_TYPES.WS_DELETE_MESSAGE_MARK: {
      const markToEdit = await Mark.findOne({ id: data.payload.idMark });
      markToEdit.messages = markToEdit.messages.filter(
        (message) => message.data !== data.payload.idMessage
      );
      return markToEdit.save();
    }

    default:
      break;
  }
}

module.exports = websocketRequest;
