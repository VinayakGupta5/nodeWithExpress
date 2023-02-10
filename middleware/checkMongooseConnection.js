async function mongooseDiscon() {
  try {
    await mongooseDisconnect();
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
    return;
  }
  // console.log("now run")
}
mongooseDiscon()