import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem'

const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id])
    
    return  loading || post === null ? <Spinner /> : <Fragment>
        <Link to='/posts' className='btn'>
            Back To Posts
        </Link>
        <PostItem key={post._id} post={post} showActions={false}/>
        <CommentForm id={post._id} />
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} id={post._id} />
            ))}
        </div>
    </Fragment>
}

Post.propTypes = {
    getPost:PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost }) (Post)
