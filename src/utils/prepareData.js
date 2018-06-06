import $ from 'jquery';

const prepareData = (url) => {
  return $.ajax({
    url: url,
    type: 'get',
    error: function(data, status, xhr) {
      let errors;
      if (data.responseJSON) {
        errors = data.responseJSON.error || 'Sorry, something went wrong…'
      } else {
        errors = 'Sorry, something went wrong…';
      }
      console.log(errors);
    },
    success: function(data, textStatus, jqXHR) {
      return data;
    }
  })
}

export default prepareData;

