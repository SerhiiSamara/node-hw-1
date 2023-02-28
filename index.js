const argv = require("yargs").argv;
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case "list":
        console.log(await listContacts());
        break;
      case "get":
        const resultGet = await getContactById(id);
        if (resultGet === null) {
          console.log(`\x1B[31m Error. Contact with id=${id} don't exist.`);
          return;
        }
        console.log(resultGet);
        break;
      case "remove":
        const resultRemove = await removeContact(id);
        if (resultRemove === null) {
          console.log(`\x1B[31m Error. Contact with id=${id} don't exist.`);
          return;
        }
        console.log(resultRemove);
        break;
      case "add":
        console.log(await addContact(action, name, email, phone));
        break;
      default:
        console.log("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

invokeAction(argv);
