import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

export default function AddForm() {
    return (
        <div>
            <h1>Add Form Screen</h1>
            <div>
                <form>
                    <label>Name:
                        <input type="text" name="name" />
                    </label>
                    <br />
                    <label>
                        Born:
                        <input type="number" name="born" />
                    </label>
                    <br />
                    <label>
                        Died:
                        <input type="number" name="died" />
                    </label>
                    <br />
                    <label>
                        Nationality:
                        <input type="text" name="nationality" />
                    </label>
                    <br />
                    <label>
                        Known For:
                        <input type="text" name="knownFor" />
                    </label>
                    <br />
                    <label>
                        Notable Works:
                        <input type="text" name="notableWorks" />
                    </label>
                    <br />
                    <label>
                        Year:
                        <input type="number" name="year" />
                    </label>
                    <br />
                    <label>
                        Medium:
                        <input type="text" name="medium" />
                    </label>
                    <br />
                    <label>
                        Dimensions:
                        <input type="text" name="dimensions" />
                    </label>
                    <br />
                    <label>
                        Location:
                        <input type="text" name="location" />   
                    </label>
                    <br />
                    <label>
                        Description:
                        <input type="text" name="description" />
                    </label>
                    <br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}