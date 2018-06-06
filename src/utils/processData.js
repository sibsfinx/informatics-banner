import { map, filter, uniq } from 'lodash';
import spacetime from 'spacetime';
import { removeSpaces, removeNonprintableChars } from './utils';

const processData = (data) => {
  // system messages:
  const logMsgs = [
    "Messages you send to this group are now secured with end-to-end encryption",
    "You're now an admin",
    "changed the subject to"
  ];

  const quitMsgs = [
    "left",
    "removed"
  ];

  const joinMsgs = [
    "created this group",
    "added you",
    "joined using this group's invite link",
  ];

  const inviteMsgs = [
    "added",
  ];

  const attachMsgs = [
    "attached>",
    "omitted>",
  ];

  const systemMsgs = joinMsgs.concat(inviteMsgs, quitMsgs, logMsgs);

  const processTextData = (data) => {
    let participants = new Array;
    let msgs = new Array;
    const lines = data.split('\r');
    try {
      msgs = map(lines, (line) => {
        const datestring = removeNonprintableChars( line.split(',')[0].replace('\n', '') );
        const timestring = removeNonprintableChars( line.split(',')[1].split(':').slice(0,3).join(':').replace(' ','') );
        const datestringFormatted = datestring.split('/').map( (str) => { return parseInt(str); }).reverse();
        const datetime = spacetime(
          datestringFormatted
          .concat(
            timestring.split(':')
          )
        );
        const timestamp = Math.floor(datetime.epoch/1000);
        const datetimestring = datetime.format('dmy') + ' '  + datetime.format('time-h24');
        let content;
        let tl = line.split(',')[1].split(':');
        let precontent = removeNonprintableChars( tl.slice(3,tl.length).join(':') );
        let isSystem = precontent.indexOf(':') === -1;
        let participant;
        if (isSystem) {
          let newParticipant;
          let joins = filter(joinMsgs, (sm) => {
            if (precontent.toLowerCase().search(sm.toLowerCase()) !== -1) {
              newParticipant = removeSpaces( precontent.replace(sm,'') );
              participants.push(newParticipant);
              //console.log(newParticipant);
              return true;
            }
          });
          if (joins.length === 0) {
            let invites = filter(inviteMsgs, (sm) => {
              if (precontent.toLowerCase().search(sm.toLowerCase()) !== -1) {
                newParticipant = removeSpaces( precontent.replace(sm,'') );
                // TODO remove inviter
                //console.log(newParticipant);
                return true;
              }
            });
          }
          // check for unknown messages
          let knownMsgs = filter(systemMsgs, (sm) => {
            if (precontent.toLowerCase().search(sm.toLowerCase()) !== -1) {
              return true;
            }
          });
          if (knownMsgs.length === 0) {
            throw {
              name: 'Unknown Whatsapp system message',
              message: precontent
            }
          }
          // TODO split participant name and message
          content = removeSpaces(precontent.replace(newParticipant, ''));
          participant = newParticipant;
        } else {
          let precontent = tl.slice(3,tl.length).join(' ');
          participant = tl[3].replace(/^\s+|\s+$/g,'');
          // TODO split participant name and message
          content = removeSpaces(precontent.replace(participant, ''));
          if (typeof(participant) === 'string') {
            participants.push(participant);
          }
        }
        participant = participant || null;
        return {
          datestring,
          datetimestring,
          timestring,
          datetime,
          timestamp,
          isSystem,
          participant,
          content
        }
      });

      participants = uniq(participants);

    } catch (e) {
      console.log(e);
    }
    return {
      msgs,
      participants
    }
  }
  return processTextData(data);
}

export default processData;
