import { DateTime } from '../../lib/luxon.js';

const dt = DateTime.now();
document.getElementById('date-time').innerHTML = `${dt.toLocaleString(DateTime.DATETIME_MED)}`;