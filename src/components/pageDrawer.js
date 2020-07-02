import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';

class PageDrawer extends Component {

    state = {
        opened: this.props.opened || false
    };

    componentDidUpdate(prevProps) {
        if (this.props.opened !== prevProps.opened) {
            this.openDrawer(this.props.opened);
        }
    }

    openDrawer = (flag, e) =>{
        if(e) e.preventDefault();
        this.setState({opened: flag});
    }

    renderOpenerBtn = () => {
        return (
            <a 
                onClick={e=>{this.openDrawer(true, e)}}
                href="/#" 
                className={`${this.state.opened? 'd-none':'d-flex'}  sp-pagedrawer-outer-btn-container ${this.props.outerBtnClassName || ''}`}
            >
                 <span className={'sp-pagedrawer-icon'}>{this.props.icon}</span> 
                 <span className={'mx-5px sp-pagedrawer-title'}>{this.props.title}</span>
            </a>
        );
    }

    renderDrawer = () => {
        return (
            <div
                className={`position-relative ${this.state.opened? 'opened' : ''}  sp-pagedrawer-container ${this.props.pagedrawerClassName || ''}`}
            >
                <div className={'d-flex align-items-center sp-pagedrawer-drawertitle-container'}>
                    <span 
                        className={'mx-5px d-flex align-items-center sp-blue-color cursor-pointer sp-pagedrawer-drawericon'}
                        onClick={e=>this.openDrawer(false)}
                    >
                            <CloseIcon/>
                        </span>
                    <span className={'mx-5px sp-pagedrawer-drawertitle'}>{this.props.title}</span>
                </div>
                <div className={'sp-pagedrawer-drawercontent-container'}>
                    {this.props.children || ''}
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                {this.renderOpenerBtn()}
                {this.renderDrawer()}
            </>
        );  
    }
}

export default PageDrawer;
