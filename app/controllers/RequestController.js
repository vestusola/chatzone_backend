/**
 |---------------------------------------------------------
 | Request Controller
 | to hold api response code and status
 |---------------------------------------------------------
 */
class RequestController {
  /**
   * Return OK status with data parsed as object
   * @param {object} data
   */
  OK(res, data) {
    return res.status(200).json(data);
  }

  /**
   * Return CREATED status with message
   * @param {string} msg
   * @param {object} data
   */
  CREATED(res, msg, data) {
    return res.status(201).json({ message: msg, data });
  }

  /**
   * Return UPDATED status with message
   * @param {string} msg
   */
  UPDATED(res, msg) {
    return res.status(202).json({ message: msg });
  }

  /**
   * Return UPDATED status with default message
   * @param {object} data
   */
  NOTFOUND(res) {
    return res.status(404).json({ message: 'Requested resources could not be found!' });
  }

  /**
   * Return ALREADY EXIST status with message
   * @param {string} msg
   */
  ALREADY_EXIST(res, msg) {
    return res.status(203).json({ message: msg });
  }

  /**
  * Return FAILED status with default message
  * @param {object} data
  */
  FAILED(res) {
    return res.status(203).json({ message: 'Request failed. Try again later!' });
  }

  /**
  * Return NETWORK_ERROR message
  * @param {object} data
  */
  NETWORK_ERROR(res) {
    return res.sendStatus(500);
  }

  /**
 * Return ERROR status with message
 * @param {string} msg
 */
  ERROR(res, msg) {
    return res.status(203).json({ message: msg });
  }

  NOT_AUTHORIZED(res)  {
    return res.status(203).json({ message: 'Request failed. Unauthorized access.'});
  }
}

module.exports = RequestController.prototype;