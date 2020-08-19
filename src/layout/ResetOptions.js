import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const ResetOptions = (props) => {
    const { translate, onChange, value } = props;
    return <FormControl>
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value.resetTasksAndAnnotations}
                        onChange={() => { onChange('tasks_and_annotations') }}
                        name="tasks_and_annotations"
                    />
                }
                label={<span style={{fontSize: '14px'}}>{translate('resources.reset.tasks_and_annotations')}</span>} 
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={value.resetCategories}
                        onChange={() => { onChange('categories') }}
                        name="categories"
                    />
                }
                label={<span style={{fontSize: '14px'}}>{translate('resources.reset.categories')}</span>} 
            />
            <FormControlLabel 
                control={
                    <Checkbox
                        checked={value.resetTweets}
                        onChange={() => { onChange('tweets') }}
                        name="tweets"
                    />
                }
                label={<span style={{fontSize: '14px'}}>{translate('resources.reset.tweets')}</span>} 
            />
        </FormGroup>
        <FormHelperText><span style={{fontSize: '14px'}}>{translate('resources.reset.be_careful')}</span></FormHelperText>
    </FormControl>
}

export default ResetOptions;