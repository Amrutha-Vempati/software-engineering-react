import TuitStats from "../components/tuits/tuit-stats";
import Profile from "../components/profile";
import {screen, render} from "@testing-library/react";
import {act, create} from 'react-test-renderer';
import {HashRouter} from "react-router-dom";

test('increase dislike and update component on click', () => {
    let stats = {
        dislikes: 123, replies: 234, retuits: 345, likes: 130
    }
    const dislikeTuit = () => {
        act(() => {
            stats.dislikes++;
            tuitStats.update(
                <TuitStats
                    tuit={{stats: stats}}
                    dislikeTuit={() => {}}
                />)
        })
    }

    let tuitStats
    act(() => {
        tuitStats = create(
            <TuitStats
                dislikeTuit={dislikeTuit}
                tuit={{stats: stats}}/>
        )
    })
    const root = tuitStats.root;
    const dislikeTuitButton = root.findByProps(
        {className: 'ttr-dislike-tuit-click'})
    const dislikesCounter = root.findByProps(
        {className: 'ttr-stats-dislikes'})
    act(() => {dislikeTuitButton.props.onClick()})
    let dislikesText = dislikesCounter.children[0];
    expect(dislikesText).toBe('124');
})

test('test render of dislikes component', () => {
    render(
        <HashRouter>
            <Profile/>
        </HashRouter>);
    const linkElement = screen.getByText(/Dislikes/i);
    expect(linkElement).toBeInTheDocument();
})