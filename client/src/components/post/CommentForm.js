import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';


const CommentForm = ({ id, addComment }) => {
const [text, setText] = useState('');
  

    return (
    <div className="post-form">
        <div className="bg-primary p">
          <h3>leave a comment...</h3>
        </div>
        <form className="form my-1" onSubmit={e=> {
            e.preventDefault();
            addComment(id, { text });
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    )
}

CommentForm.propTypes = {
    addComment:PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm)
